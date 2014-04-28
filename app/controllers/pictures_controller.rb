class PicturesController < ApplicationController
  before_filter :authenticate_user!
  # GET /pictures
  # GET /pictures.json
  def index
    id = (params[:id].to_i || 0) * 8
    @pictures = current_user.pictures.limit(8).offset(id)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @pictures }
    end
  end

  # GET /pictures/1/edit
  def edit
    session[:ref]= request.referrer
    @picture = current_user.pictures.find(params[:id])
  end

  # POST /pictures
  # POST /pictures.json
  def create
    @picture = current_user.pictures.new(params[:picture])

    respond_to do |format|
      if @picture.save
        format.html { redirect_to @picture, notice: 'Picture was successfully created.' }
        format.json { render json: @picture, status: :created, location: @picture }
      else
        format.html { render action: "new" }
        format.json { render json: @picture.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /pictures/1
  # PUT /pictures/1.json
  def update
    # ref = request.referrer
    @picture = current_user.pictures.find(params[:id])

    respond_to do |format|
      if @picture.update_attributes(params[:picture])
        format.html { redirect_to session[:ref] , notice: 'Picture was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @picture.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pictures/1
  # DELETE /pictures/1.json
  def destroy
    @picture = current_user.pictures.find(params[:id])
    @picture.destroy

    respond_to do |format|
      format.html { redirect_to pictures_url }
      format.json { head :no_content }
    end
  end
end
