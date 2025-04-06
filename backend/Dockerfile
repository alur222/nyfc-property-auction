FROM python:3.10-slim

# Set the working directory
WORKDIR /code

# Copy requirements and install dependencies

COPY ./requirements.txt /code/requirements.txt
# RUN apt-get update && apt-get install -y --no-install-recommends curl
# RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /code/requirements.txt

# Copy the application code
COPY ./app /code/app

# Set PYTHONPATH to the working directory
ENV PYTHONPATH="/code"

# Run the application with uvicorn in reload mode
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]