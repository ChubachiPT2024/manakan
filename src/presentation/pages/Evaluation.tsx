import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import { ReportGetCommand } from "src/application/reports/reportGetCommand";
import { ReportGetResult } from "src/application/reports/reportGetResult";
import { CourseGetCommand } from "src/application/courses/courseGetCommand";

// 一旦、レポートとコースのデータを取得して確認する仕組みを作成している
// 今後、学生や提出物等を取得する仕組みを追加する必要がある
// また、エラー処理も追加する必要がある
// 規模が拡大することが予想されるため、react-queryやswrなどのライブラリを検討する必要がある
// また、コンポーネントの分割も検討する必要がある

// リクエスト状態
const REQUEST_STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
}

/**
 * レポートとコースのデータを取得する
 * 
 * @param reportId 
 * @returns 
 */
const fetchData = async (reportId: string) => {
  // ローディングを表示するためには、コメントアウトを解除する
  // 人工的な遅延の追加（例: 2秒）
  // await new Promise(resolve => setTimeout(resolve, 2000));

  const reportGetResult = await window.electronAPI.getReportAsync(
    new ReportGetCommand(Number(reportId))
  );

  const courseGetResult = await window.electronAPI.getCourseAsync(
    new CourseGetCommand(reportGetResult.reportData.courseId)
  );

  return {
    report: reportGetResult.reportData,
    course: courseGetResult.courseData
  };
}

// 初期状態
export const initialState = {
  fetchState: REQUEST_STATE.INITIAL, // 取得状況
  report: null as ReportGetResult | null,   // レポートデータ
}

// アクションタイプ
// 割愛しているが、エラー処理も追加する必要がある
export const dataActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
}

/**
 * レポートのリデューサー
 * 
 * @param state 
 * @param action 
 * @returns 
 */
export const dataReducer = (state: any, action: any) => {
  switch (action.type) {
    case dataActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      }
    case dataActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetchState: REQUEST_STATE.OK,
        report: action.payload.report,
        course: action.payload.course,
      }
    default:
      throw new Error();
  }
}


// ページ名称については検討の余地あり
const Evaluation = () => {
  // urlパラメータからレポートIDを取得
  const { reportId } = useParams();

  // レポートのデータを取得する
  const [ dataState, dispatch ] = useReducer(dataReducer, initialState);

  useEffect(() => {
    dispatch({ type: dataActionTypes.FETCHING });
    // レポートの取得処理
    fetchData(reportId)
      .then((data) =>
        dispatch({
          type: dataActionTypes.FETCH_SUCCESS,
          payload: {
            report: data.report,
            course: data.course
          }
        })
      )
      .catch((e) => {
        console.error(e);
      });
  }, [reportId]);

  return (
    <>
      <h1>Evaluation Page</h1>
      <p>評価対象のフォルダがインポートされたら、遷移されてくるページ</p>
      {dataState.fetchState === "LOADING" ? (
        <p>取得中...</p>
      ) : (
        dataState.report && dataState.course && (
          <>
            <p>取得完了</p>
            <h2>{dataState.report.title}</h2>
            <h2>{dataState.course.name}</h2>
          </>
        )
      )}
    </>
  );
};

export default Evaluation;
