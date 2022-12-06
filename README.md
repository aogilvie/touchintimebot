## Setup

- See sample config.json
- Running manually, just execute `./run.sh`

## Scheduling

You can set your own cron jobs as follows:

```
# create a local log file
touch output.log

# edit your crontab
crontab -e

# then add a line (this will run every minute and log to file)
* * * * * cd /home/ally/Documents/touchintimebot && ./run.sh > /home/ally/Documents/touchintimebot/output.log 2>&1
```

![Crontab-ui Image](./crontab-ui.png)
