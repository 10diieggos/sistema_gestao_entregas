#!/bin/bash

# Defina o nome de usuário e a senha do Samba
smb_user=$SMB_USER
smb_pass=$SMB_PASS

# Crie o usuário
adduser --disabled-password --gecos "" $smb_user

# Defina a senha do usuário
echo -ne "$smb_pass\n$smb_pass\n" | passwd $smb_user

# Adicione o usuário ao grupo Samba
echo -ne "$smb_pass\n$smb_pass\n" | smbpasswd -a -s $smb_user

# Configure as permissões de compartilhamento do Samba para o novo usuário
sh -c "echo '
[global]
   workgroup = WORKGROUP
   server string = %h server (Samba, Ubuntu)
   log file = /var/log/samba/log.%m
   max log size = 1000
   syslog = 0
   panic action = /usr/share/samba/panic-action %d

   security = user
   map to guest = bad user
   guest account = nobody

[minhaect]
   comment = Compartilhamento Samba
   path = /minhaect
   valid users = $smb_user
   read only = no
   browseable = yes
' > /etc/samba/smb.conf"

# Reinicie o serviço do Samba
# Obs: é necessário reiniciar o container: docker restart samba
