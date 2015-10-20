json.array!(@posts) do |post|
  json.extract! post, :id, :user_id, :group_id, :post_type, :subject, :problem, :suggestion, :publish_date, :status
  json.url post_url(post, format: :json)
end
