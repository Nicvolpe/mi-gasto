from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from .external import get_rates

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def rates_view(request):
    base = request.query_params.get('base','USD')
    return Response(get_rates(base))
