import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import * as actions from "../../actions";
import { RootAction, RootState } from "../../store";

import { OpenWeatherMapAppId } from "../../config.json";

import styles from "./index.scss";

export interface ISearchBoxProps {
  placeholder: string;
  request?: (key: string, options: actions.api.IRequestOptions) => void;
}

export interface ISearchBoxState {
  value: string;
}

export class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
  public state = {
    value: "",
  };

  public render() {
    const { placeholder } = this.props;
    const { value } = this.state;

    return (
      <form className={styles.container} onSubmit={this.onSubmit}>
        <input
          type="text"
          autoFocus={true}
          onChange={this.onChangeText}
          value={value}
          placeholder={placeholder}
        />
        <button type="submit">Search</button>
      </form>
    );
  }

  private onChangeText = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event;
    let { value } = target as HTMLInputElement;

    value = value.replace(/\s+/g, " ");
    this.setState({ value });
  }

  private onSubmit = (event: React.SyntheticEvent) => {
    const { request } = this.props;
    let { value } = this.state;

    event.preventDefault();

    value = value.trim();

    const [city, country] = value.split(/,/g).map((x) => x.trim().replace(/\s+/g, " ").toLowerCase());

    request(`weather-${city}-${country}`, {
      query: {
        APPID: OpenWeatherMapAppId,
        q: `${city},${country}`,
        units: "metric",
      },
      url: `http://api.openweathermap.org/data/2.5/forecast`,
    });

    this.setState({ value: "" });
  }
}

const mapStateToProps = (state: RootState, props: ISearchBoxProps) => ({
  ...props,
});
const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  request: actions.api.request,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
