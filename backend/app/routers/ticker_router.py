from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Property, Bid

router = APIRouter(
    prefix="/ticker",
    tags=["Ticker"]
)

@router.get("")
def get_ticker_data(db: Session = Depends(get_db)):
    # Fetch bids and categorize them
    bids = db.query(Bid).all()
    your_bids = {
        "outbid": len([b for b in bids if b.status == "outbid"]),
        "active": len([b for b in bids if b.status == "active"]),
        "winning": len([b for b in bids if b.status == "winning"])
    }

    your_bid_amounts = {
        "outbid": sum(b.amount for b in bids if b.status == "outbid"),
        "active": sum(b.amount for b in bids if b.status == "active"),
        "winning": sum(b.amount for b in bids if b.status == "winning")
    }

    # Fetch properties and their details
    properties = db.query(Property).all()
    property_listing = [
        {
            "id": p.id,
            "street_address": p.street_address,
            "current_winning_bid": p.current_winning_bid,
            "last_bid_difference": p.last_bid_difference,
            "images": [img.image_url for img in p.images],
            "market_value": p.market_value,
            "reservation_price": p.reservation_price,
        }
        for p in properties
    ]

    return {
        "your_bids": your_bids,
        "your_bid_amounts": your_bid_amounts,
        "property_listing": property_listing
    }