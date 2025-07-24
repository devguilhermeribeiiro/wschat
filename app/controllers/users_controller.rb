class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new params.expect(user: [ :email, :password ])

    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: "Parabéms seu registro foi concluido!"
    else
      render :new
    end
  end
end
