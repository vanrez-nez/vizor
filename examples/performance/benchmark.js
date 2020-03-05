export default function JSBenchmark({
  setup = () => {},
  tests = [],
}) {

  var bench = new Benchmark.Suite;
  function onComplete(event) {
    console.log('Test finished: ', event.target.name);
  }

  function onStart(event) {
    console.log('Starting: ', event.target.name);
  }

  function onError(event) {
    console.error(event.message);
  }

  function logSummary(benchmarks) {
    var rows = benchmarks.map(({ name, count, cycles, hz }) => {
      return {
        name,
        count: count.toLocaleString(),
        cycles,
        'ops/sec': hz.toLocaleString(),
      };
    });

    console.table(rows);
  }

  bench.on('complete', function() {
    console.log('Finished', this.filter('fastest').map('name'), this);
    logSummary(this.slice());
  });

  tests.forEach(function({ name, fn }) {
    bench.add(name, { fn, setup, onComplete, onStart, onError });
  });

  return {
    run: function() {
      setTimeout(function() {
        bench.run();
      }, 100);
    }
  }
}