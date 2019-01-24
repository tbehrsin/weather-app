import { shallow, render } from "enzyme";
import React from "react";

import { SearchBox } from "./index";

import * as api from "../../actions/api";

jest.mock("../../actions/api");

describe("SearchBox", () => {
  it("should match snapshot", () => {
    const wrapper = render(<SearchBox placeholder="Test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should send request on submit", () => {

    const request = jest.fn().mockImplementationOnce(() => null);

    const event = { preventDefault: () => { /* NOOP */ }};
    const wrapper = shallow(<SearchBox placeholder="Test" request={request} />);
    wrapper.setState({ value: "Manchester, GB" });
    expect(wrapper.find("form").length).toBe(1);
    wrapper.find("form").simulate("submit", event);
    expect(request.mock.calls).toMatchSnapshot();
  });
});
