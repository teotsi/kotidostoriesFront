import { shallowMount } from "@vue/test-utils";
import Post from "../LandingPage/Post";


const factory = () => {
  return shallowMount(Post, {
  });
};

describe("Post", () => {
  test("mounts properly", () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders properly", () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
