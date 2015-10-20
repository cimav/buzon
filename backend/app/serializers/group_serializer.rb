class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :is_department, :user_id, :status
end
