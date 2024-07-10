import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { MdOutlineReadMore } from "react-icons/md";

const Review = () => {
  // 評点の状態
  const [grade, setGrade] = useState<number>(0);


  // 評点が変更された時の処理
  const handleChange = (event: SelectChangeEvent) => {
    setGrade(Number(event.target.value));
  };
  
  return (
    <>
      <div className="h-full overflow-hidden">
        {/* navbar */}
        <div className="z-50 bg-white fixed top-0 flex items-center w-full p-2 border-b shadow-sm">
          {/* 戻るボタン */}
          <MdOutlineReadMore className='w-12 h-12' color={"#a9a9a9"} />
        </div>

        {/* メインコンテンツ */}
        <div className='flex mt-14' style={{ height: 'calc(100vh - 4rem)' }}>

          {/* PDF表示 */}
          <div className="w-10/12 pl-8 pt-5 overflow-x-auto whitespace-nowrap flex overflow-y-hidden">
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生1</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 4rem)' }}>
                <div
                  className='mb-5 bg-red-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 1-1
                </div>
                <div
                  className='mb-5 bg-red-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 1-2
                </div>
                <div
                  className='bg-red-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 1-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生2</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-blue-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 2-1
                </div>
                <div
                  className='mb-5 bg-blue-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 2-2
                </div>
                <div
                  className='bg-blue-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 2-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生3</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-green-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 3-1
                </div>
                <div
                  className='mb-5 bg-green-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 3-2
                </div>
                <div
                  className='bg-green-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 3-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生4</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-pink-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 4-1
                </div>
                <div
                  className='mb-5 bg-pink-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 4-2
                </div>
                <div
                  className='bg-pink-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 4-3
                </div>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>学生5</h2>
              <div className="inline-block overflow-y-auto m-2" style={{ height: 'calc(100vh - 3.5rem)' }}>
                <div
                  className='mb-5 bg-purple-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 5-1
                </div>
                <div
                  className='mb-5 bg-purple-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 5-2
                </div>
                <div
                  className='bg-purple-500'
                  style={{
                  width: 900,
                  height: 1000,
                }}>
                  PDF 5-3
                </div>
              </div>
            </div>
          </div>

          {/* sidebar */}
          <div className="w-96 p-4 m-2 border-l-4 flex flex-col justify-start overflow-y-auto">

            {/* 学生選択のラジオボタン */}
            <div className="flex flex-col m-1">
              <FormControl>
                <h2 className="text-xl font-bold mb-1">学生選択</h2>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue="学生1"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="学生1" control={<Radio />} label="学生1" sx={{m: "0"}}/>
                  <FormControlLabel value="学生2" control={<Radio />} label="学生2" sx={{m: "0"}}/>
                  <FormControlLabel value="学生3" control={<Radio />} label="学生3" sx={{m: "0"}}/>
                  <FormControlLabel value="学生4" control={<Radio />} label="学生4" sx={{m: "0"}}/>
                  <FormControlLabel value="学生5" control={<Radio />} label="学生5" sx={{m: "0"}}/>
                </RadioGroup>
              </FormControl>
            </div>

            {/* 提出者情報 */}
            <div className='flex flex-col m-1'>
              <h2 className="text-xl font-bold mb-2">提出者情報</h2>
              <ul className="pl-3">
                <li className='mb-2'>学生名：学生1</li>
                <li className='mb-2'>学籍番号：0000000</li>
                <li className='mb-2'>提出日時：2021/09/01 12:00</li>
              </ul>
            </div>

            {/* 分類 セレクトボタン*/}
            <div className='m-1'>
              <h2 className="text-xl font-bold mb-2">分類</h2>
              <div className='pl-3'>
              <FormControl fullWidth>
                <Select
                  id="select"
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={grade.toString()}
                  onChange={handleChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                </Select>
              </FormControl>
              </div>
            </div>

            {/* 点数 */}
            <div className='m-1'>
              <h2 className="text-xl font-bold mb-2">点数</h2>
              <div className='pl-3'>
                <TextField id="score" type='number' value={100} variant="outlined" fullWidth inputProps={{ 'aria-label': 'Without label', min: 0, max: 100 }}/>
              </div>
            </div>

            {/* メモ テキストエリア*/}
            <div className='m-1'>
              <h2 className="text-xl font-bold mb-2">メモ</h2>
              <div className='pl-3'>
                {/* TODO: placeholderを相談 */}
                <TextField id="memo" multiline rows={4} placeholder="評価する際のメモを記述ください" sx={{m: "0"}} fullWidth />
              </div>
            </div>

            {/* フィードバック テキストエリア*/}
            <div className='m-1'>
              <h2 className="text-xl font-bold mb-2">フィードバック</h2>
              <div className='pl-3'>
                {/* TODO: placeholderを相談 */}
                <TextField id="feedback" multiline rows={4}  placeholder="学生に伝えるためのフィードバックを記述ください" fullWidth/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Review;
