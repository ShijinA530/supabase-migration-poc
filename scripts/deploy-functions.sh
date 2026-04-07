#!/bin/bash

echo "🚀 Deploying all edge functions..."

supabase functions deploy check-user-exists
supabase functions deploy delete-user
supabase functions deploy invite-user

echo "✅ All functions deployed"