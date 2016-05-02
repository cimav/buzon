class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.references :group, index: true
      t.string :first_name
      t.string :last_name
      t.string :email
      t.integer :reports_to
      t.date :start_date
      t.date :end_date
      t.integer :status

      t.timestamps null: false
    end
  end
end
