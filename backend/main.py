from fastapi import FastAPI


app = FastAPI()

data = [
    {"name": "John", "age": 25},
    {"name": "Jane", "age": 24},
    {"name": "Jake", "age": 26},
    {"name": "Jill", "age": 27}
]


@app.post("/")
async def get_data():
    return {"data": data}
