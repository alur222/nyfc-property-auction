from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.models.models import Property, PropertyImage, Bid

def seed_data():
    Base.metadata.create_all(bind=engine)  # Create tables

    db: Session = SessionLocal()

    # Sample properties
    property1 = Property(
        street_address="123 Main St",
        current_winning_bid=250000.00,
        last_bid_difference=-5000.00,
        market_value=300000.00,
        reservation_price=200000.00
    )
    property2 = Property(
        street_address="456 Elm St",
        current_winning_bid=300000.00,
        last_bid_difference=10000.00,
        market_value=350000.00,
        reservation_price=250000.00
    )

    # Sample images
    property1.images = [
        PropertyImage(image_url="14floodst.png"),
        PropertyImage(image_url="14floodst.png")
    ]
    property2.images = [
        PropertyImage(image_url="versala.png"),
        PropertyImage(image_url="versala.png")
    ]
    
    # Add properties to the database and commit
    db.add(property1)
    db.add(property2)
    db.commit()

    # Sample bids
    bids = [
        Bid(user_id=1, property_id=1, amount=240000.00, status="outbid"),
        Bid(user_id=2, property_id=1, amount=250000.00, status="winning"),
        Bid(user_id=1, property_id=2, amount=290000.00, status="active"),
        Bid(user_id=3, property_id=2, amount=300000.00, status="winning")
    ]

    db.add_all(bids)

    db.commit()
    db.close()

if __name__ == "__main__":
    seed_data()