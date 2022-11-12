import subprocess
process = subprocess.Popen(['./injectRpcArgs.sh'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
process.wait() # Wait for process to complete.

# iterate on the stdout line by line
for line in process.stdout.readlines():
    print(line)