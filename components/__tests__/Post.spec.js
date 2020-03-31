import { shallowMount } from "@vue/test-utils";
import Post from "../LandingPage/Post";


const factory = () => {
  return shallowMount(Post, {
    propsData:{
      title:"Testy story",
      preview:"Testy preview that actually turned out waaaay too long so it will sadly be truncated",
      id:"42",
      content:"A lonely gray couch!",
      date:"05/05/05",
      user:"testidis"
    }
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
