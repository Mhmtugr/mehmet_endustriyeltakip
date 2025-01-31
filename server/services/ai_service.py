import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from flask import current_app  # Flask bağlamı için
from ..extensions import db
from ..models import AIModelTrainingData

class AIServices:
    model = None
    feature_columns = None

    @classmethod
    def train_model(cls):
        with current_app.app_context():  # Flask veritabanı bağlantısını kullan
            data_records = AIModelTrainingData.query.all()

            if len(data_records) < 5:
                cls.model = None
                return "Not enough data to train model."

            rows = []
            for r in data_records:
                rows.append({
                    "product_type": r.product_type,
                    "complexity_factor": r.complexity_factor,
                    "total_material_count": r.total_material_count,
                    "actual_delivery_days": r.actual_delivery_days
                })

            df = pd.DataFrame(rows)
            df = pd.get_dummies(df, columns=["product_type"])
            y = df['actual_delivery_days']
            X = df.drop('actual_delivery_days', axis=1)

            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            model = LinearRegression()
            model.fit(X_train, y_train)
            score = model.score(X_test, y_test)

            cls.model = model
            cls.feature_columns = list(X.columns)
            return f"Model trained. R^2 score: {score:.2f}"

    @classmethod
    def predict_delivery_days(cls, product_type, complexity_factor, total_material_count):
        if cls.model is None:
            return "Model has not been trained yet. Please train the model first."

        input_dict = {
            "complexity_factor": complexity_factor,
            "total_material_count": total_material_count,
            "product_type_CB": 0,
            "product_type_LB": 0,
            "product_type_FL": 0,
            "product_type_RMU": 0
        }
        pt_key = f"product_type_{product_type}"
        if pt_key in input_dict:
            input_dict[pt_key] = 1

        row = [input_dict.get(col, 0) for col in cls.feature_columns]
        arr = np.array(row).reshape(1, -1)
        y_pred = cls.model.predict(arr)
        return max(0, round(y_pred[0]))
