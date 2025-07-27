class ChatController < ApplicationController
  before_action :authenticate

  def index
  end

  def new_chat
    @room = params[:room]
  end

  def create
    if @room = params[:room]
      redirect_to new_chat_path(room: params[:room]),
        notice: "Chat iniciado na sala #{@room}, envie sua mensagem."
    else
      render :index, alert: "Sala de bate-papo inesistente"
    end
  end
end
