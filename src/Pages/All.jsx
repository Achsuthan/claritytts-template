import React, { Component } from "react";
import BaseLayout from "../Hoc/BaseLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadCriteriaFn } from "../store/actions/CriteriaActions";

import PageContent from "../Components/PageContent";

class All extends Component {
  componentDidMount() {
    this.props.loadCriteriaFn("all_criterias.json");
  }

  render() {
    return (
      <BaseLayout>
        <PageContent heading="All"></PageContent>
      </BaseLayout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCriteriaFn }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(All);
