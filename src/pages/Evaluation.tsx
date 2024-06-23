import { useLocation } from "react-router-dom";

// ページ名称については検討の余地あり
const Evaluation = () => {
    const location = useLocation();
    const data = location.state;

    console.log(data);

    return (
        <div>
            <h1>Evaluation Page</h1>
            <p>This is the Evaluation page after import.</p>
            <p>{data.filelist}</p>
        </div>
    );
};

export default Evaluation;