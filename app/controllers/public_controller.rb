class PublicController < ApplicationController
 def index
    id = (params[:id].to_i || 0) * 8
    @pictures = Picture.where(public: true).limit(8).offset(id)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @pictures }
    end
  end

  def show
    @picture = Picture.find_by_id_and_public(params[:id], true)
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @picture }
    end
  end
end
