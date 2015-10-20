class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name
  has_one :group, embed: :ids, include: false
end
