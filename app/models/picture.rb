class Picture < ActiveRecord::Base
  belongs_to :user
  attr_accessible :image_data, :name, :public, :user
  validates_format_of :name, with: /^[a-z\s_0-9]+$/i, on: :create, on: :update

  default_scope order: 'created_at DESC'
end
