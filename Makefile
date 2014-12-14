dist: clean
	@if [ ! -d "out" ]; then mkdir -p out; fi
	@cp -R manifest.json images scripts out/
	@zip -q -r ng-trace out && rm -rf out

clean:
	@if [ -f "ng-trace.zip" ]; then rm ng-trace.zip; fi
