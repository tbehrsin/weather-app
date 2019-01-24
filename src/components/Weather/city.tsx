import moment from "moment";
import React from "react";
import { connect } from "react-redux";

import * as selectors from "../../selectors";
import { RootState } from "../../store";

export const hours = [0, 6, 12, 18].map((hour) => hour * 3600 * 1000);

export interface IWeatherProps {
  request: string;
}

export interface IWeatherPropsRedux extends IWeatherProps {
  requestBody: any;
  
}

class WeatherCity extends React.Component<IWeatherProps, {}> {
  public render() {
    const { requestBody: { city, list } } = this.props as IWeatherPropsRedux;

    const offset = moment()
      .local()
      .startOf("day")
      .add(Math.ceil(new Date().getHours() / 6) * 6, "hours")
      .toDate()
      .getTime();

    const results = hours
      .map((hour) => hour + offset)
      .map((time) => list.find((item: any) => item.dt === time / 1000));

    return (
      <tr>
        <td>{city.name}, {city.country}</td>
        {results.map((result: any) => <td key={result.dt}>{Math.round(result.main.temp)} ºC</td>)}
      </tr>
    );
  }
}

const mapStateToProps = (state: RootState, props: IWeatherProps) => ({
  requestBody: selectors.api.body(state)(props.request),
  ...props,
});
export default connect(mapStateToProps)(WeatherCity);
