from halomod_app import utils
from flask import Blueprint, jsonify

plot_types_bp = Blueprint('plot_types', __name__)

# This endpoint returns the details of all the different plot types that
# can be used to represent a halo model.
#
# expects: None
# outputs: KEYMAP as defined in `utils.py`


@plot_types_bp.route('/', methods=["GET"], strict_slashes=False)
def get_plot_types():
    res = utils.KEYMAP
    return jsonify(res)  # returns full key map of plot types