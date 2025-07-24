require "test_helper"

class ChatControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get chat_login_url
    assert_response :success
  end

  test "should get sign_up" do
    get chat_sign_up_url
    assert_response :success
  end

  test "should get index" do
    get chat_index_url
    assert_response :success
  end
end
