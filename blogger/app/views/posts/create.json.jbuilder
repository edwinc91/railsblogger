json.post do
  json.id @post.id
  json.title @post.title
  json.description @post.description
  json.authored_at time_ago_in_words(@post.created_at) + " ago"
end
