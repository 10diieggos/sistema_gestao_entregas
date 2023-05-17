Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.disksize.size = "50GB"
  config.vm.network "forwarded_port", guest: 3000, host: 8183 # frontend
  config.vm.network "forwarded_port", guest: 8080, host: 8184 # phpmyadmin
  config.vm.network "forwarded_port", guest: 8000, host: 8185 # backend
  config.vm.network "forwarded_port", guest: 3306, host: 8186 # MariaDB
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  SHELL
end
