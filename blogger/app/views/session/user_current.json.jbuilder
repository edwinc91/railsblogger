if current_user
  json.current_user do
    json.username current_user.username
    json.email current_user.email
  end
else
  json.current_user nil
end
