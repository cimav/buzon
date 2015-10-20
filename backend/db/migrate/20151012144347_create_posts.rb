class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.references :user, index: true
      t.references :group, index: true
      t.string :post_type
      t.string :subject
      t.text :problem
      t.text :suggestion
      t.datetime :publish_date
      t.integer :status

      t.timestamps null: false
    end
  end
end
