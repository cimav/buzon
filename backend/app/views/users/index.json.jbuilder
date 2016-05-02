json.array!(@users) do |user|
  json.extract! user, :id, :group_id, :first_name, :last_name, :email, :reports_to, :start_date, :end_date, :status
  json.url user_url(user, format: :json)
end
