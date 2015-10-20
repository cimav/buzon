class ChangeResponseContentToBody < ActiveRecord::Migration
  def change
    rename_column :responses, :content, :body
  end
end
