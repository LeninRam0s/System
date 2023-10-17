import pymysql
from config import MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, MYSQL_CURSORCLASS
from src.utils.Logger import Logger
import traceback

def get_connection():
    try:
        connection = pymysql.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            db=MYSQL_DB,
            cursorclass=getattr(pymysql.cursors, MYSQL_CURSORCLASS)
        )
        return connection
    except pymysql.Error as e:
        Logger.add_to_log("error", str(e))
        Logger.add_to_log("error", traceback.format_exc())
