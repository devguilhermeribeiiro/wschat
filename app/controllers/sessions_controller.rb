class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.authenticate_by(email: params[:email], password: params[:password])

    if user
      session[:user_id] = user.id
      redirect_to root_path, notice: "Logado com sucesso!"
    else
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Sessão encerrada, faça login novamente para acessar o site"
  end
end
