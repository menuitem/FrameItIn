class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :name
      t.text :image_data
      t.boolean :public
      t.references :user

      t.timestamps
    end
    add_index :pictures, :user_id
  end
end
