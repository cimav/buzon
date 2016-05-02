class ChangeProblemToBody < ActiveRecord::Migration
  def change
    rename_column :posts, :problem, :body
    remove_column :posts, :suggestion
  end
end
