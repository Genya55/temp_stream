import json
import boto3
from botocore.exceptions import ClientError
from datetime import datetime

s3 = boto3.client('s3')

BUCKET_NAME = 'stream-temp-test'
PREFIX = 'pub/myhome/'

def lambda_handler(event, context):
    try:
        response = s3.list_objects_v2(Bucket=BUCKET_NAME, Prefix=PREFIX)
        
        if 'Contents' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'No files found'})
            }

        objects = sorted(response['Contents'], key=lambda obj: obj['LastModified'], reverse=True)
        
        latest_date = None
        all_data = []

        for obj in objects:
            object_key = obj['Key']
            latest_object = s3.get_object(Bucket=BUCKET_NAME, Key=object_key)
            object_data = latest_object['Body'].read().decode('utf-8')

            try:
                json_data = json.loads(object_data)

                temp_in = json_data.get('temp_in')
                get_date = json_data.get('get_date')  # Format: YYYY-MM-DD
                get_time = json_data.get('get_time')  # Format: HH:MM:SS

                timestamp_str = f"{get_date} {get_time}"
                timestamp = datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S")

                if latest_date is None:
                    latest_date = get_date
                if get_date != latest_date:
                    break  # Only process data for the latest day

                formatted_timestamp = timestamp.strftime("%Y-%m-%d-%H-%M")

                all_data.append({
                    'date': formatted_timestamp,
                    'temp_in': temp_in,
                    'temp_out': json_data.get('temp_out'),
                    'charging_status': json_data.get('charging_status'),
                    'load_power': json_data.get('load_power'),
                    'solar_power': json_data.get('solar_power'),
                    'solar_voltage': json_data.get('solar_voltage'),
                    'solar_current': json_data.get('solar_current'),
                    'battery_voltage': json_data.get('battery_voltage')
                })

            except json.JSONDecodeError:
                continue

        all_data = sorted(all_data, key=lambda x: datetime.strptime(x['date'], "%Y-%m-%d-%H-%M"))

        return {
            'statusCode': 200,
            'body': json.dumps(all_data)
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f"Error fetching object: {e}"})
        }
