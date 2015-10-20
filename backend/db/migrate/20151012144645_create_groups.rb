class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.references :user, index: true
      t.string :name
      t.string :short_name
      t.boolean :is_department
      t.integer :status

      t.timestamps null: false
    end
  end
end
