Deprecated instructions for hosting on AWS...

Relevant Resources:
- (Hosting a static website)[https://medium.com/@KerrySheldon/ec2-exercise-1-1-host-a-static-webpage-9732b91c78ef]
- (helpful tutorial on adding a certificate)[https://levelup.gitconnected.com/adding-a-custom-domain-and-ssl-to-aws-ec2-a2eca296facd]
- (SSL on linux via aws)[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-ami.html]
- (Get certificate on aws cli)[https://docs.aws.amazon.com/cli/latest/reference/acm/get-certificate.html]


MAKE SURE YOU MODIFY THE ALB INBOUND RULES, NOT THE EC2's

### Instructions for Copying Files:
`scp -i <INSERT_PEM.pem> <INSERT_FILENAME> ec2-user@<PUBLIC_DNS>:~/`

### How to ssh in

`ssh -i <INSERT_PEM.pem> ec2-user@<PUBLIC_DNS>`