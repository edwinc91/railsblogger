class PostsController < ApplicationController

  # skip_before_action :verify_authenticity_token

  before_action :require_current_user

  def home
    render '/homepage', layout: "angular"
  end

  def index
    @posts = current_user.posts
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save

    else
      render json: {
        error: {
          message: @post.errors.full_messages.to_sentence
        }
      }
    end
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      render json: @post
    else
      render json: {
        error: {
          message: @post.errors.full_messages.to_sentence
        }
      }
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { head :no_content }
    end
  end

  private

  def post_params

    params.require(:post).permit(:title, :description)

  end
end
