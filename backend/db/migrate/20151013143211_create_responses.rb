class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.references :post
      t.references :user
      t.references :group
      t.text       :content
      t.datetime   :publish_date
      t.timestamps null: false
    end
  end
end
