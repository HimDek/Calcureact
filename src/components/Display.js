
import "./Display.css";

const Display = ({ num0, operator, num, res }) => {
    return (
        <div className="display bg-dark">
            <div className="input">
                {operator === "" || (operator === "√" && !num0) ? "" : num0} {operator} {num}
            </div>
            <div className="result">
                {res}
            </div>
        </div>
    );
};

export default Display;