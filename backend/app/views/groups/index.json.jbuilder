json.array!(@groups) do |group|
  json.extract! group, :id, :user_id, :name, :short_name, :is_department, :status
  json.url group_url(group, format: :json)
end
