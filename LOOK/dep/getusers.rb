require 'mysql2'

client = Mysql2::Client.new(host: 'localhost', username: 'root', password: 'Pw.8ML', database: 'intranet')

members = client.query("SELECT
	user_email AS email,
	display_name AS name,
	(SELECT value FROM wp_bp_xprofile_data WHERE user_id=U.ID AND field_id=13) AS major,
	(SELECT value FROM wp_bp_xprofile_data WHERE user_id=U.ID AND field_id=5) AS year,
	(SELECT value FROM wp_bp_xprofile_data WHERE user_id=U.ID AND field_id=34) AS gender,
	(SELECT unsubscribe_code <= '' FROM wp_enewsletter_members WHERE wp_user_id=U.id) AS unsubscribed
FROM wp_users U")

puts '{ "users": [ '

members.each_with_index do |member,index|
	registration_year = 0
    if member['year'].is_a?(String) && member['year'].length > 0
        registration_year = ("20" + member['year'][2..4]).to_i 
    else
        registration_year = 2014
    end
	next if registration_year < 2009
    comma = if index < members.size-1 then "," else "" end
    puts "{ \"name\": \"#{member['name']}\", \"email\": \"#{member['email']}\" }#{comma}" 
end

puts "] }"
