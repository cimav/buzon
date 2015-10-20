class CreateSupporters < ActiveRecord::Migration
  def change
    create_table :supporters do |t|
      t.references :post
      t.references :user
      t.timestamps null: false
    end
  end
end
