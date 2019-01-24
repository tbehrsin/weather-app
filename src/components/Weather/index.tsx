
import moment from "moment";
import React from "react";
import { connect } from "react-redux";

import * as selectors from "../../selectors";
import { RootState } from "../../store";

import WeatherCity, { hours } from "./city";
import styles from "./index.scss";

export interface IWeatherPropsRedux {
  requestKeys: string[];
}

class Weather extends React.Component<{}, {}> {
  public render() {
    const { requestKeys } = this.props as IWeatherPropsRedux;

    const offset = moment()
      .local()
      .startOf("day")
      .add(Math.ceil(new Date().getHours() / 6) * 6, "hours")
      .toDate()
      .getTime();

    const headings = hours
      .map((hour) => hour + offset)
      .map((time) => moment(time).local().format("ha"));

    return (
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>City</th>
              {headings.map((heading, i) => <th key={i}>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {requestKeys.map((key) => <WeatherCity request={key} key={key} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, props: {}) => ({
  requestKeys: selectors.api.requestKeys(state),
  ...props,
});
export default connect(mapStateToProps)(Weather);
