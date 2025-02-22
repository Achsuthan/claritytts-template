import React, { useState, useEffect } from "react";
import {
  SELECTION_ARRAY_DAY_OR_MONTH,
  SELECTION_ARRAY_DAYS_NAME,
  SELECTION_ARRAY_MONTH_NAME
} from "./Constants/index";

import MinMaxStay from "./Common/MinMaxStay";
import CriteriaLayout from "../../Hoc/CriteriaLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setMinStay } from "../../store/actions/MinStayAction";

import {
  MIN_STAY_MONTH_OR_DAYS_REQUIRED,
  MIN_STAY_NO_OF_WEEK_REQUIRED,
  MIN_STAY_OPTION_REQUIRED,
  MIN_STAY_TYPE_REQUIRED
} from "./Constants/ErrorMessages";

const MinStay = props => {
  let { setMinStay } = props;
  const [numOfDayOrMOnth, setNumOfDayOrMOnth] = useState("");
  const [numOfWeek, setNumOfWeek] = useState("");
  const [dayOrMonth, setDayOrMonth] = useState([]);
  const [startDay, setStartDay] = useState([]);

  let monthOrDaysRequried = "";
  let optionRequiredMessage = "";
  let noOfWeekRequired = "";
  let typeRequiredMessage = "";

  if (!props.isValid) {
    if (!numOfDayOrMOnth && !monthOrDaysRequried) {
      monthOrDaysRequried = MIN_STAY_MONTH_OR_DAYS_REQUIRED;
    }

    if (dayOrMonth.length === 0) {
      optionRequiredMessage = MIN_STAY_OPTION_REQUIRED;
    }

    if (startDay.length === 0) {
      typeRequiredMessage = MIN_STAY_TYPE_REQUIRED;
    }

    if (!numOfWeek) {
      noOfWeekRequired = MIN_STAY_NO_OF_WEEK_REQUIRED;
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.minStay && props.minStay.length > 0) {
        let tmpMinStay = props.minStay[0];
        let operator = tmpMinStay.operator.split("@");
        setNumOfWeek(tmpMinStay.from_value);
        setNumOfDayOrMOnth(tmpMinStay.to_value);
        let temDayOrMonth = SELECTION_ARRAY_DAY_OR_MONTH.filter(
          obj => operator[0] === obj.name
        );
        setDayOrMonth(temDayOrMonth);
        let tmpStartDay =
          operator[0] === "Day"
            ? SELECTION_ARRAY_DAYS_NAME.filter(obj => operator[1] === obj.name)
            : SELECTION_ARRAY_MONTH_NAME.filter(
                obj => operator[1] === obj.name
              );

        setStartDay(tmpStartDay);
      }
    }
  }, []);
  //<<EditDetail

  //redux > start
  let monthString = "";
  monthString = dayOrMonth.length > 0 ? dayOrMonth[0].value : "";
  monthString =
    startDay.length > 0 ? monthString + "@" + startDay[0].value : "";
  setMinStay({
    value: [
      {
        criteria_code: "minStay",
        operator: monthString,
        from_value: numOfWeek,
        to_value: numOfDayOrMOnth,
        value_type: "D"
      }
    ]
  });
  //redux > end

  const setDayOrMonthFn = value => {
    
    setDayOrMonth(value);
    setStartDay([]);
  };

  return (
    <CriteriaLayout heading="MinStay">
      <MinMaxStay
        monthOrDaysRequried={monthOrDaysRequried}
        optionRequiredMessage={optionRequiredMessage}
        noOfWeekRequired={noOfWeekRequired}
        typeRequiredMessage={typeRequiredMessage}
        name={"MaxStay"}
        placeHolder="Select Type"
        numOfDayOrMOnth={numOfDayOrMOnth}
        setNumOfDayOrMOnth={e => {
          setNumOfDayOrMOnth(e);
          optionRequiredMessage = "";
        }}
        SELECTION_ARRAY_DAY_OR_MONTH={SELECTION_ARRAY_DAY_OR_MONTH}
        dayOrMonth={dayOrMonth}
        setDayOrMonth={val => {
          setDayOrMonthFn(val);
        }}
        SELECTION_ARRAY_DAYS_NAME={
          dayOrMonth.length == 0 || dayOrMonth[0].value === "Day"
            ? SELECTION_ARRAY_DAYS_NAME
            : SELECTION_ARRAY_MONTH_NAME
        }
        numOfWeek={numOfWeek}
        setNumOfWeek={e => {
          setNumOfWeek(e);
          noOfWeekRequired = "";
        }}
        setStartDay={(e)=>{
          setStartDay(e)
          typeRequiredMessage = ""
        }}
        startDay={startDay}
      />
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.MinStay.isValid,
    isEdit: state.EditDetails.isEdit,
    minStay: state.EditDetails.minStay
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setMinStay
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MinStay);
