import React, { useState } from "react";
import "./survey.css";
import "../../assets/css/global.css";
import "../../assets/css/responsive.css";
import { answers } from "../common/data";

const Survey = (props) => {
  const {
    title,
    questions,
    setTab,
    tabId,
    isActive,
    setAnswers,
    submitSurvey,
    comments,
    test,
    test1,
    test2,
    test3,
  } = props;
  const [ansData, setAnsData] = useState([]);
  const [changeBtnAndBgColor, setChangeBtnAndBgColor] = useState(false);
  const [surveyId1, setSurveyId1] = useState(tabId + 1);
  const [comment, setComment] = useState();
  // const dispatch = useDispatch();

  const surveyData = {
    survey_id: surveyId1,
    question: ansData,
    comment: comment,
  };

  // useEffect(() => {
  // dispatch(getSurveyDataAction(login?.uuid));
  // }, [login]);

  const handleChangeText = (e) => {
    setComment(e.target.value);
  };
  const saveButton = () => {
    setChangeBtnAndBgColor(!changeBtnAndBgColor);
    setSurveyId1(surveyId1);
    setTab(tabId);
    setAnswers(surveyData);
    submitSurvey();
  };

  const setAnsId = (qId, qAns) => {
    let existingAns = ansData.filter((ans) => ans.qid === qId);
    if (existingAns.length > 0) {
      existingAns.forEach((f) => {
        let ansDataInd = ansData.findIndex((e) => e.qid === f.qid);
        ansData[ansDataInd].ans = qAns + 1;
      });
      setAnsData([...ansData]);
    } else {
      ansData.length === 0
        ? setAnsData([{ qid: qId, ans: qAns + 1 }])
        : setAnsData((ansData) => [...ansData, { qid: qId, ans: qAns + 1 }]);
    }
  };

  return (
    <div>
      <div className="survey-main">
        <div
          className="survey-container"
          style={
            changeBtnAndBgColor || (test1 && test2 && test3)
              ? { backgroundColor: "#11963E" }
              : { backgroundColor: "#1A1A1A" }
          }
        >
          <div className="survey-container-title">
            <p className="survey-title-icon"></p>
            <p className="survey-title2">{title}</p>
          </div>
          <div className="survey-button-main">
            {!test ? (
              changeBtnAndBgColor ? (
                <button
                  className="survey-button-save_saved"
                  onClick={() => saveButton()}
                  disabled
                >
                  {" "}
                  Save{" "}
                </button>
              ) : (
                <>
                  <button
                    className="survey-button-save_saved"
                    disabled={test ? test : ansData.length < 5 || !comment}
                    onClick={() => {
                      saveButton();
                    }}
                  >
                    Save
                  </button>
                </>
              )
            ) : null}
          </div>
        </div>
      </div>
      {isActive || (test1 && test2 && test3) ? (
        <div className="radio-main">
          <div className="radio-question">
            {questions.map((question, ansId) => {
              return (
                <div key={ansId}>
                  <p className="s-questions">
                    {question.qid}. {question.question}
                  </p>
                  <div className="radio-border">
                    {answers.map((e, ansId) => {
                      let isActive = ansData.filter(
                        (qa) => qa.qid === question.qid
                      );
                      let btnActive;
                      if (isActive.length > 0) {
                        btnActive =
                          ansId + 1 <= isActive[0].ans ? "active" : "";
                      } else {
                        btnActive = ansId + 1 <= question.ans && "active";
                      }
                      return (
                        <div
                          key={ansId}
                          className={`radio ${
                            ansId + 1 <= 4
                              ? `red`
                              : ansId + 1 > 4 && ansId + 1 <= 7
                              ? `orange`
                              : "green"
                          } ${btnActive}`}
                          name={question.qid}
                          onClick={() => setAnsId(question.qid, ansId)}
                          htmlFor="radio1"
                        >
                          <input
                            className="input"
                            id="radio1"
                            type="radio"
                            name={question.qid}
                            value={question.ans}
                            disabled={test1 && test2 && test3}
                          />
                          <b className="radio-text">{e.value}</b>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="s-questions">Your Review</p>

          <textarea
            onChange={handleChangeText}
            // type="textarea"
            name="review"
            rows="3"
            defaultValue={comments}
            disabled={test1 && test2 && test3}
          />
        </div>
      ) : null}
    </div>
  );
};
export default Survey;
