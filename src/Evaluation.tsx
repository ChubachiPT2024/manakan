import { useParams } from "react-router-dom";

function Evaluation() {
    const { reportId } = useParams();
    console.log(reportId);
    return (
        <>
            <h1> Evaluation</h1>
            <a href="#/">Go to Home</a>
        </>
    );
}

export { Evaluation };